import * as Yup from 'yup';
import accountFormModel from './accountFormModel';

const {
    formField: {
        userid,
        accName,
        bankName,
        accNo,
        amountToInvest,
        amountInCash,
        chequeAmount,
        noOfCheques,
        chequeNo,
        chequeDescription,
        tokenAmount,
        tokenDays,
        tokenDescription,
        taxAmount,
        payorderAmount,
        noOfPayOrder,
        payOrderNo,
        payorderDescription,
        onlineTransfer,
        onlineDescription
    }
} = accountFormModel;

const validationSchema = [
    Yup.object().shape({
        [userid.name]: Yup.array().of(Yup.object().shape({
            id: Yup.number(), name: Yup.string(), amount: Yup.string()
        }))
    }),
    Yup.object().shape({
        [accName.name]: Yup.string().required(`${accName.requiredErrorMsg}`),
        [bankName.name]: Yup.string().required(`${bankName.requiredErrorMsg}`),
        [accNo.name]: Yup.string().required(`${accNo.requiredErrorMsg}`),
        [amountToInvest.name]: Yup.string().required(`${amountToInvest.requiredErrorMsg}`),
        [amountInCash.name]: Yup.string().nullable()
    }),
    Yup.object().shape({
        [chequeAmount.name]: Yup.string().required(`${chequeAmount.requiredErrorMsg}`),
        [noOfCheques.name]: Yup.string().required(`${noOfCheques.requiredErrorMsg}`),
        [chequeNo.name]: Yup.string().required(`${chequeNo.requiredErrorMsg}`),
        [chequeDescription.name]: Yup.string().nullable()
    }),
    Yup.object().shape({
        [tokenAmount.name]: Yup.string().required(),
        [tokenDays.name]: Yup.string().required(),
        [tokenDescription.name]: Yup.string().required(),
        [taxAmount.name]: Yup.string().required(),
    }),
    Yup.object().shape({
        [payorderAmount.name]: Yup.string().required(`${payorderAmount.requiredErrorMsg}`),
        [noOfPayOrder.name]: Yup.string().required(`${noOfPayOrder.requiredErrorMsg}`),
        [payOrderNo.name]: Yup.string().required(`${payOrderNo.requiredErrorMsg}`),
        [payorderDescription.name]: Yup.string().nullable()
    }),
    Yup.object().shape({
        [onlineTransfer.name]: Yup.string().nullable(),
        [onlineDescription.name]: Yup.string().nullable()
    })
];
export default validationSchema;
