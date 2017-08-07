/* File that integrates the three parts of the speech -> widgetText process */

const { streamingMicRecognize } = require('./stt/listen');
const { sendQuery } = require('./nlp/getResponse');
const { analyzeRequest } = require('./nlp/responseLogic');

// // start Listening for One Command
// streamingMicRecognize();

// Local Helper Functions


// Exported Function
// getCommand(query, slackId)
//  - Param:
//  - Return:  object (keys: bool isFinished,  )
//  - Description: called from Widget, runs three STT funcs, produces object response


function getCommand () {

}
