const mongoose = require('mongoose');

const appStateSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: 'main',
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('AppState', appStateSchema);
