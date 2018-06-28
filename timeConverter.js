



function timeConverter(utcSeconds){
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds)
  return  d.toDateString().slice(4,15)
}

// timeConverter(1521417600)

module.exports = timeConverter