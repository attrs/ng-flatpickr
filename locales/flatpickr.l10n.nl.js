/* Dutch locals for flatpickr */


exports.weekdays = {
  shorthand: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
  longhand: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag']
};

exports.months = {
  shorthand: ['Jan', 'Feb', 'Maa', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec'],
  longhand: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December']
};

exports.firstDayOfWeek = 1;

exports.ordinal = function(nth) {
  if (nth === 1 || nth === 8 || nth >= 20) {
    return "ste";
  }

  return "de";
};
  
