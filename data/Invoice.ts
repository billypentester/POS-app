export const dataParams: any = {
    outputType: "save",
    returnJsPDFDocObject: true,
    fileName: "Invoice 2022",
    orientationLandscape: false,
    compress: true,
    logo: {
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    stamp: {
        inAllPages: true,
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
        width: 20, //aspect ratio = width/height
        height: 20,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    business: {
        name: "NexaGlow Traders",
        address: "Raiwind, Lahore",
        phone: "033333333",
        email: "email@example.com",
        email_1: "info@example.al",
        website: "www.example.al",
    },
    contact: {
        label: "Invoice issued for:",
        name: "Bilal Ahmad",
        address: "Lahore, Pakistan",
        phone: "03324187624",
        email: "",
        otherInfo: "",
    },
    invoice: {
        label: "Invoice #: ",
        num: 19,
        invDate: "Payment Date: 01/01/2021 18:12",
        invGenDate: "Invoice Date: 02/02/2021 10:17",
        headerBorder: false,
        tableBodyBorder: true,
        header: [
            {
                title: "#", 
                style: { 
                width: 10 
                } 
            }, 
            { 
                title: "Title",
                style: {
                width: 80
                } 
            }, 
            // { 
            //     title: "Description",
            //     style: {
            //     width: 80
            //     } 
            // }, 
            { title: "Price"},
            { title: "Quantity"},
            // { title: "Unit"},
            { title: "Total"}
        ],
        table: [],
        additionalRows: [
            {
                col1: 'SubTotal:',
                col2: '4530',
                col3: 'Rs',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            {
                col1: 'Discount:',
                col2: '0',
                col3: '%',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            {
                col1: 'Delivery:',
                col2: '0',
                col3: 'Rs',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            {
                col1: 'Total:',
                col2: '4530',
                col3: 'Rs',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
        ],
        
        invDescLabel: "Invoice Note",
        invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
}