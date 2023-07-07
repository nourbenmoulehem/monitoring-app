import mongoose from "mongoose";

const OverallStatClientSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
      unique: true,
    },
    professionStats: {
      type: [
        {
          profession: {
            type: String,
            required: true,
          },
          count: {
            type: Number,
            required: true,
            default: 0,
          },
        },
      ],
      default: [],
    },
    workSectorStats: {
      type: [
        {
          workSector: {
            type: String,
            required: true,
          },
          count: {
            type: Number,
            required: true,
            default: 0,
          },
          activityNatureStats: [
            {
              activityNature: {
                type: String,
                enum: ["Public", "Private"],
                required: true,
              },
              count: {
                type: Number,
                required: true,
                default: 0,
              },
            },
          ],
        },
      ],
      default: [],
    },
    revenueHistogram: {
      type: [
        {
          range: {
            type: String,
            required: true,
          },
          count: {
            type: Number,
            required: true,
            default: 0,
          },
        },
      ],
      default: [],
    },
    genderStats: {
      type: [
        {
          gender: {
            type: String,
            enum: ["M", "F"],
            required: true,
          },
          count: {
            type: Number,
            required: true,
            default: 0,
          },
        },
      ],
      default: [],
    },

    membershipTypeStats: {
      type: [
        {
          membershipType: {
            type: String,
            required: true,
          },
          monthlyCounts: [
            {
              month: {
                type: String,
                required: true,
              },
              count: {
                type: Number,
                required: true,
                default: 0,
              },
            },
          ],
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const OverallStatClient = mongoose.model("OverallStatClient", OverallStatClientSchema);
export default OverallStatClient;
