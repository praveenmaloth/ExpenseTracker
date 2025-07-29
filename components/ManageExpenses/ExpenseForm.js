import {  View , StyleSheet , Alert} from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({onCancel , submitButtonLabel , onSubmit , defaultValues}){

   const [inputValues , setInputValues] = useState({
    amount:defaultValues ? defaultValues.amount.toString() : '',
    date: defaultValues ? getFormattedDate(defaultValues.date) :  '',
    description: defaultValues ? defaultValues.description : ''
   });

  function inputChangeHandler(inputIdentifier,enteredValue){
         setInputValues((currentInputValues)=>{
            return{
                ...currentInputValues,
                [inputIdentifier] : enteredValue
            };

         });
  }

  function submitHandler(){
    const expenseData = {
        amount: +inputValues.amount,
        date: new Date(inputValues.date),
        description : inputValues.description
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid){
      
      Alert.alert('Invalid Input', 'Please Check Your Input Values')
      return;
    }

    onSubmit(expenseData);
  }



    return(
        <View>
          
            <Input label='Amount' textInputConfig={{
                keyboardType:'decimal-pad',
                onChangeText: inputChangeHandler.bind(this , 'amount'),
                value: inputValues.amount
            }}/>
            <Input label='Date' textInputConfig={{
                placeholder:'YY-MM-DD',
                onChangeText: inputChangeHandler.bind(this , 'date'),
                value: inputValues.date
            }}/>
            
            <Input label='Description' textInputConfig={{
                multiline:true,
                onChangeText: inputChangeHandler.bind(this , 'description'),
                value: inputValues.description
            }}/>

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
           
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

