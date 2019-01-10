const fs = require('fs')
var Printer = require('node-printer')
var options = {
  n: 1
}

// Get available printers list
console.log(Printer.list())

// Create a new Pinter from available devices
var printer = new Printer('Dai_Nippon_Printing_DS40')

// Print from a buffer, file path or text
var fileBuffer = fs.readFileSync('/opt/share/snaps/capt0000.jpg')
var jobFromBuffer = printer.printBuffer(fileBuffer)

/*
var filePath = 'package.json'
var jobFromFile = printer.printFile(filePath)
*/

/*
var text = 'Print text directly, when needed: e.g. barcode printers'
var jobFromText = printer.printText(text)
*/

// Cancel a job
// jobFromFile.cancel()

// Listen events from job
jobFromBuffer.once('sent', function () {
  console.log(`Job ${jobFromBuffer.identifier} sent`)
  jobFromBuffer.on('completed', function () {
    console.log(`Job ${jobFromBuffer.identifier}has been printed`)
    jobFromBuffer.removeAllListeners()
  })
})
