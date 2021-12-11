import * as Yup from 'yup';
import accountFormModel from './accountFormModel';

const {
    formField: {
        userid,
        admData,
        amountInCash,
        taxDescription,
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
        admData: Yup.object().shape({
            id: Yup.number(),
            name: Yup.string(),
            amount: Yup.string()
        })
    }),
    Yup.object().shape({
        [userid.name]: Yup.array().of(
            Yup.object().shape({
                id: Yup.number(),
                name: Yup.string(),
                amount: Yup.string()
            })
        )
    }),
    Yup.object().shape({
        [chequeAmount.name]: Yup.string(),
        [noOfCheques.name]: Yup.string(),
        [chequeNo.name]: Yup.string(),
        [chequeDescription.name]: Yup.string().nullable(),
        [amountInCash.name]: Yup.string()
    }),
    Yup.object().shape({
        [tokenAmount.name]: Yup.string().required(),
        [tokenDays.name]: Yup.string().required(),
        [tokenDescription.name]: Yup.string(),
        [taxAmount.name]: Yup.string().required(),
        [taxDescription.name]: Yup.string()
    }),
    Yup.object().shape({
        [payorderAmount.name]: Yup.string(),
        [noOfPayOrder.name]: Yup.string(),
        [payOrderNo.name]: Yup.string(),
        [payorderDescription.name]: Yup.string().nullable()
    }),
    Yup.object().shape({
        [onlineTransfer.name]: Yup.string().nullable(),
        [onlineDescription.name]: Yup.string().nullable()
    })
];
export default validationSchema;
