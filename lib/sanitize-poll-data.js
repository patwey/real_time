function sanitizePollData(data) {
  sanitizedData = {};
  sanitizedData.title = data.title || "";
  sanitizedData.options = sanitizeOptions(data.options) || [];

  return sanitizedData;
}

function sanitizeOptions(options) {
  var sanitizedOptions = [];
  if (typeof options === "string") {
    sanitizedOptions.push(options);
  } else {
    for (var i in options) { sanitizedOptions.push(options[i]); }
  }
  return sanitizedOptions;
}

module.exports = sanitizePollData;
