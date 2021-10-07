import accountFormModel from './accountFormModel';

const {
    formField: {
        accName,
        bankName,
        accNo,
        amountToInvest,
        amountInCash,
        chequeAmount,
        noOfCheques,
        chequeNo,
        chequeDescription,
        payorderAmount,
        noOfPayOrder,
        payOrderNo,
        payorderDescription,
        onlineTransfer,
        onlineDescription
    }
} = accountFormModel;

const formInitialValues = {
    [accName.name]: '',
    [bankName.name]: '',
    [accNo.name]: '',
    [amountToInvest.name]: 0,
    [amountInCash.name]: 0,
    [chequeAmount.name]: 0,
    [noOfCheques.name]: '',
    [chequeNo.name]: '',
    [chequeDescription.name]: '',
    [payorderAmount.name]: 0,
    [noOfPayOrder.name]: '',
    [payOrderNo.name]: '',
    [payorderDescription.name]: '',
    [onlineTransfer.name]: 0,
    [onlineDescription.name]: ''
};
export default formInitialValues;
