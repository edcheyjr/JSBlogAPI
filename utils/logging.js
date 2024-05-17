import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path
  .dirname(__filename)
  .split('/')
  .filter((item, index) => item !== 'utils')
  .join('/')
/**
 * Logs object data along with their corresponding datetime.
 * @param {Object} obj - Any object.
 */
export function logObjectData(obj) {
  // Get current datetime
  const currentDate = new Date().toISOString()

  // Construct log message
  const logMessage = `[${currentDate}]: Result Object, ${obj}`

  // // Define log file path
  // const logFilePath = path.join(__dirname, '/logs.txt')

  // // Check if log file exists
  // fs.access(logFilePath, fs.constants.F_OK, (err) => {
  //   if (err) {
  //     // If log file doesn't exist, create it
  //     fs.writeFile(logFilePath, '', (err) => {
  //       if (err) {
  //         console.error('Error creating log file:', err)
  //         return
  //       }
  //       // Append log message to log file
  //       appendToLogFile(logFilePath, logMessage)
  //     })
  //   } else {
  //     // Log message to existing log file
  //     appendToLogFile(logFilePath, logMessage)
  //   }
  // })
  console.log(
    '----------------------------------------------------------------------------------------------------------------------------------'
  )

  console.log(logMessage)
}

/**
 * Logs any message along with its corresponding datetime.
 * @param {string} message - Message to be logged.
 */
export function logMessage(message) {
  // Get current datetime
  const currentDate = new Date().toISOString()

  // Construct log message
  const logMessage = `[${currentDate}]: ${message}\n`

  // Define log file path
  // const logFilePath = path.join('/logs.txt')

  // // Check if log file exists
  // fs.access(logFilePath, fs.constants.F_OK, (err) => {
  //   if (err) {
  //     // If log file doesn't exist, create it
  //     fs.writeFile(logFilePath, '', (err) => {
  //       if (err) {
  //         console.error('Error creating log file:', err)
  //         return
  //       }
  //       // Append log message to log file
  //       appendToLogFile(logFilePath, logMessage)
  //     })
  //   } else {
  //     // Log message to existing log file
  //     appendToLogFile(logFilePath, logMessage)
  //   }
  // })
  console.log(
    '----------------------------------------------------------------------------------------------------------------------------------'
  )

  console.log(logMessage)
  console.log(
    '----------------------------------------------------------------------------------------------------------------------------------'
  )
}

// Function to append log message to log file
function appendToLogFile(logFilePath, logMessage) {
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err)
    }
  })
}
