import axios from "axios";


const BACKEND_URL='https://react-native-course-354ab-default-rtdb.firebaseio.com'

export function storeExpense(expenseData){
    axios.post(BACKEND_URL+'/expenses.json',
        expenseData
    );
}

export async function fetchExpense(){
  const response = await axios.get(BACKEND_URL +'/expenses.json' );

 
  const expenses = [];

  for(const key in response.data){
    const expenseObj = {
      id : key,
      amount: response.data[key].amount,
      date : response.data[key].date,
      description : response.data[key].description
    };

    expenses.push( expenseObj);
  }

  return expenses;
}