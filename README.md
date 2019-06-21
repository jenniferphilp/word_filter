This script synchronously searches through .txt testing files, searching for 'high risk' and 'low risk' phrases (these can be found in the phrases_rated folder). The output shows the score for each testing file based on the following calculation: 

score = (number of low risk phrases) + (number of high risk phrases * 2)


##To Run Script: ##
1. *Install node modules:* $ npm install
2. Run index: $ node index.js
3. The required output should appear in output.txt. 


