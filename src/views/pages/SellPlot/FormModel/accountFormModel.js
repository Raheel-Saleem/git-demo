const accountFormModel = {

    formId: 'plotForm',
    formField: {
        admData: {
            name: 'admData',
            label: 'Admin Amount',
            requiredErrorMsg: 'Admin Amount is Required'
        },
        userid: {
            name: 'userid',
            label: 'Partner',
            requiredErrorMsg: 'Partner Information is Required'
        },
        accName: {
            name: 'accName',
            label: 'Account Title',
            requiredErrorMsg: 'Account Title is Required'
        },
        bankName: {
            name: 'bankName',
            label: 'Bank Name',
            requiredErrorMsg: 'Bank Name  is Required'
        },
        accNo: {
            name: 'accNo',
            label: 'Account Number:',
            requiredErrorMsg: 'Account Number  is Required'
        },
        amountToInvest: {
            name: 'amountToInvest',
            label: 'Amount To Invest:',
            requiredErrorMsg: 'Account Amount  is Required'
        },
        amountInCash: {
            name: 'amountInCash',
            label: 'Amount In Cash:'
        },
        /*******   Cheque  *******/
        chequeAmount: {
            name: 'chequeAmount',
            label: 'Check Amount:',
            requiredErrorMsg: 'Cheque Ammount  is Required'
        },
        noOfCheques: {
            name: 'noOfCheques',
            label: 'Number of Cheques:',
            requiredErrorMsg: 'Count Of Cheques  is Required'
        },
        chequeNo: {
            name: 'chequeNo',
            label: 'Cheque Number:',
            requiredErrorMsg: 'Cheque Number  is Required'
        },
        chequeDescription: {
            name: 'chequeDescription',
            label: 'Description:'
            // requiredErrorMsg: 'Cheques Number  is Required'
        },

        /*******   PayOrder  *******/
        payorderAmount: {
            name: 'payorderAmount',
            label: 'PayOrder Amount:',
            requiredErrorMsg: 'PayOrder Amount  is Required'
        },
        noOfPayOrder: {
            name: 'noOfPayOrder',
            label: 'Number of PayOrder:',
            requiredErrorMsg: 'Count Of PayOrder  is Required'
        },
        payOrderNo: {
            name: 'payOrderNo',
            label: 'PayOrder Number:',
            requiredErrorMsg: 'PayOrder Number  is Required'
        },
        payorderDescription: {
            name: 'payOrderDescription',
            label: 'Description:'
            // requiredErrorMsg: 'Cheques Number  is Required'
        },
        // ********** Token ***************/
        tokenAmount: {
            name: "tokenAmount",
            label: "Token Amount",
        },
        tokenDays: {
            name: "tokenDays",
            label: "Token Days",
        },
        tokenDescription: {
            name: "tokenDescription",
            label: "Token Description",
        },
        taxAmount: {
            name: "taxAmount",
            label: "Tax Amount",
        },
        taxDescription: {
            name: "taxDescription",
            label: "Tax Description",
        },
        /*******   Online Transfer  *******/
        onlineTransfer: {
            name: 'onlineTransfer',
            label: 'Online Transfer Amount:'
        },
        onlineDescription: {
            name: 'onlineDescription',
            label: 'Description:'
            // requiredErrorMsg: 'Cheques Number  is Required'
        }

    }
};
export default accountFormModel;
