/* File that integrates the three parts of the speech -> widgetText process */

const { streamingMicRecognize } = require('./stt/listen');
const { sendQuery } = require('./nlp/getResponse');
const { analyzeRequest } = require('./nlp/responseLogic');

// // start Listening for One Command
// streamingMicRecognize();

// Local Helper Functions
function callGetCommand(widgetName) {
  console.log('reached 1');
  return streamingMicRecognize()
    .then( userRequest => {
      console.log('reached 2');
      return sendQuery(userRequest, widgetName);
    })
    .then( response => {
      console.log('reached 3:');
      return analyzeRequest(response.data);
    })
    .then ( resp => {
      console.log('reached 4:');
      // if (resp.notFinished) {
      //   console.log('reached 4.5');
      //
      //   // optl. timeout to wait 1 sec to reduce time actively listening
      //   setTimeout(() => getCommand(widgetName), 1000);
      // }
      return resp;
    })
    .catch( err => {
      console.log('ERROR in processing human: ', err);
    });
}

// Exported Function
// getCommand(widgetName)
//  - Param:
//  - Return:  object (keys: bool isFinished,  )
//  - Description: called from Widget, runs three STT funcs, produces object response
function getCommand (widgetName) {
  console.log('reached {A}')
  return callGetCommand(widgetName)
    .then(respObj => {
      console.log('reached {B}')

      if (respObj.notFinished) {
        console.log('reached {C}')
        return getCommand(widgetName);
      }

      console.log('reached {D}')
      return respObj;
    })
    .catch(err => {
      console.log('encountered error :(', err);
    })
}

module.exports = { getCommand };
