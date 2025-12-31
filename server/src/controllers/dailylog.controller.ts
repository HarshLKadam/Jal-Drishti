import { Context } from "hono";
import { prisma } from "../lib/prisma";

/**
 * Operator creates daily pump log
 */
export const createDailyLog = async (c: Context) => {
  try {
    // 🔐 operator id comes from auth middleware
    const operatorId = c.get("operatorId");

    if (!operatorId) {
      return c.json(
        { success: false, message: "Unauthorized operator" },
        401
      );
    }

    const body = await c.req.json();

    const {
      pump_id,
      start_time,
      end_time,
      chlorine_added,
      gps_lat,
      gps_lng,
    } = body;

    // 🧪 Validation
    if (
      !pump_id ||
      !start_time ||
      !end_time ||
      gps_lat === undefined ||
      gps_lng === undefined
    ) {
      return c.json(
        {
          success: false,
          message: "All fields including GPS are required",
        },
        400
      );
    }

    // 🔎 Check pump exists
    const pump = await prisma.pump.findUnique({
      where: { pump_id: Number(pump_id) },
    });

    if (!pump) {
      return c.json(
        { success: false, message: "Invalid or unauthorized pump" },
        400
      );
    }

    // ⏱️ Time calculation
    const start = new Date(start_time);
    const end = new Date(end_time);

    if (end <= start) {
      return c.json(
        { success: false, message: "End time must be after start time" },
        400
      );
    }

    const durationMs = end.getTime() - start.getTime();
    const hours = durationMs / (1000 * 60 * 60);

    // 💧 Water usage (LITERS)
    const usage_liters = hours * pump.flow_rate_lph;

    // 📝 Create log
    const log = await prisma.dailyLog.create({
      data: {
        operator_id: operatorId,
        pump_id: pump.pump_id,
        start_time: start,
        end_time: end,
        chlorine_added: Boolean(chlorine_added),
        usage_liters,
        gps_lat,
        gps_lng,
      },
    });

    return c.json({
      success: true,
      message: "Daily log created successfully",
      data: log,
    });
  } catch (error: any) {
    console.error("DailyLog Error:", error);

    return c.json(
      {
        success: false,
        message: "Failed to create daily log",
      },
      500
    );
  }
};
