import accountFormModel from './accountFormModel';

const {
    formField: {
        admData,
        userid,
        accName,
        bankName,
        tokenAmount,
        tokenDays,
        tokenDescription,
        taxAmount,
        taxDescription,
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
    [userid.name]: [{ id: "", name: "", amount: "" }],
    [admData.name]: { id: "", name: '' },
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
    [onlineDescription.name]: '',
    [tokenAmount.name]: 0,
    [tokenDays.name]: 0,
    [tokenDescription.name]: "",
    [taxAmount.name]: 0,
    [taxDescription.name]: 0
};
export default formInitialValues;
