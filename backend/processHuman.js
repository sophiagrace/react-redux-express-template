/* File that integrates the three parts of the speech -> widgetText process */

const { streamingMicRecognize } = require('./stt/listen');
const { sendQuery } = require('./nlp/getResponse');
const { analyzeRequest } = require('./nlp/responseLogic');

// // start Listening for One Command
// streamingMicRecognize();

// Local Helper Functions


// Exported Function
// getCommand(widgetName)
//  - Param:
//  - Return:  object (keys: bool isFinished,  )
//  - Description: called from Widget, runs three STT funcs, produces object response
function getCommand (widgetName) {
  console.log('reached 1:', widgetName);
  return streamingMicRecognize()
    .then( userRequest => {
      console.log('reached 2:', userRequest);
      return sendQuery(userRequest, widgetName);
    })
    .then( response => {
      console.log('reached 3:', response);
      return responseLogic(response.data);
    })
    .catch( err => {
      console.log('ERROR in processing human: ', err);
    });
}
