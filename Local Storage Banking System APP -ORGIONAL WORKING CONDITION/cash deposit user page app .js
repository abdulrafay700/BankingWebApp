// user_page.js

// Declare loggedInUrlName at the top level  in URL
let loggedInUrlName;

document.addEventListener("DOMContentLoaded", function () {
    // Display the logged-in user's name on the user page
    let userName = document.getElementById("loggedInUserName");

    // Extract the logged-in user's name from the URL
    let urlParams = new URLSearchParams(window.location.search);
    loggedInUrlName = urlParams.get("user");
    console.log(loggedInUrlName);

    // Get the user name from the email address
    let userHistoryName 
    let atIndex = loggedInUrlName.indexOf("@");
    if (atIndex !== -1) {
        userName.innerText = loggedInUrlName.substring(0, atIndex);
        userHistoryName = loggedInUrlName.substring(0, atIndex);
    } else {
        userName.innerText = loggedInUrlName;
        userHistoryName = loggedInUrlName
    }

// select buttons  Divs and section
let navButtons = document.querySelectorAll(".nav-btn");
let Cash = document.getElementById("showAmount");
let homeMenu = document.querySelector("#userAmount")

// Local storage call
let localDatabase = JSON.parse(localStorage.getItem("users"));
console.log(localDatabase );

// Find the email address from the local database
let findEmailIndex = -1; // Initialize to -1, indicating email not found
for (let i = 0; i < localDatabase.length; i++) {
    if (localDatabase[i].email === loggedInUrlName) {   
        findEmailIndex = i;
        break; // Break out of the loop after finding the email
    }
}

    // Show cash when login
    if (findEmailIndex !== -1) {
        // Email found in the database
        if (localDatabase[findEmailIndex].cash !== undefined) {
            // Cash amount is defined
            Cash.innerText = localDatabase[findEmailIndex].cash;
        } else {
            // Cash amount is undefined, set it to 0 or another default value
            Cash.innerText = 0;
        }
    } else {
        // Email not found in the database
        console.log("Email not found in the database");
    }



console.log(loggedInUrlName)
console.log(loggedInUrlName)
console.log(loggedInUrlName)
console.log(loggedInUrlName)
console.log()

   

////=================>FOR CASH DEPOSIT START 2 btn<==================///
navButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (e.target.innerText.includes("Cash Deposit")) {
            let cash_deposit = parseInt(prompt("Enter your amount"));

            if (isNaN(cash_deposit)) {
                alert("Please enter a valid amount");
            } else {
                // Continue with the deposit logic
                if (localDatabase[findEmailIndex].email == loggedInUrlName) {
                    console.log("Statement true, found");
                    
              

                    // Update the cash property in the existing user object
                    
                   if( localDatabase[findEmailIndex].cash == 0 || localDatabase[findEmailIndex].cash == null){
                     localDatabase[findEmailIndex].cash = 0   
                     localDatabase[findEmailIndex].cash    += cash_deposit
                     localStorage.setItem("users", JSON.stringify(localDatabase));

                   }else{
                    localDatabase[findEmailIndex].cash += cash_deposit
                    localStorage.setItem("users", JSON.stringify(localDatabase));

                   }
                    

                    // Save the updated array back to localStorage
                    Cash.innerText = localDatabase[findEmailIndex].cash
                    // add a cash in real cash amount
                  CashDepositDate(loggedInUrlName, cash_deposit)
                    alert("cash addedd")
                } else {
                    alert("Email not found");
                }
            }
        }
    });
});

// ...

// Cash deposit end


// ==============> FOR Cash Withdraw Start 3 button <============================
    navButtons.forEach((btn)=>{
        btn.addEventListener("click" ,(e)=>{
            if(e.target.innerText.includes("Cash Withdraw")){
                let withdraw =  parseInt(prompt("Enter the amount to withdraw the cash"))
                if(!isNaN(withdraw)){                    
                    if(localDatabase[findEmailIndex].cash >=     withdraw){
                        // AdditonofAmount - withdraw
                        localDatabase[findEmailIndex].cash =localDatabase[findEmailIndex].cash - withdraw
                        localStorage.setItem("users", JSON.stringify(localDatabase));
                        Cash.innerText = localDatabase[findEmailIndex].cash
                        // now rest the current cash amount from code
                        AdditonofAmount = localDatabase[findEmailIndex].cash
                        CashWithdrawDate(loggedInUrlName,withdraw)
                        alert("Transection Successfull")
                       
                    }
                    else{
                    alert("Insufficient Balance Transection Failed")
                    }
                }
                    else{
                        alert("please Enter the Digit Transection Failed")
                    }                      
            }
           

        })
    })
    // ==============> FOR Cash Withdraw Start <============================


    // ==============> FOR Cash Trasnsfer Start <============================

    navButtons.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
                if(e.target.innerText.includes("Cash Transfer")){
                   let transferPerson = prompt("enter the email address")
                   let cashTransfer = parseInt(prompt("enter the amount for cash transfer"))
                    
                    // finding the email from database find just index number jis ko send kerna hai money
                    let transferPersonIndex     
                    for (var i = 0 ; i<localDatabase.length ; i++){
                        if(localDatabase[i].email == transferPerson){
                            transferPersonIndex = i
                            
                            // now check the balance is Available greater then transfer Amount
                            if(localDatabase[findEmailIndex].cash >= cashTransfer){
                                // now transfer amount the
                            localDatabase[transferPersonIndex].cash 
                            = localDatabase[transferPersonIndex].cash + cashTransfer
                            // now dedect amount from the current user 
                            localDatabase[findEmailIndex].cash -= cashTransfer;
                            // set the amount in database   
                            localStorage.setItem("users", JSON.stringify(localDatabase));

                            Cash.innerText = localDatabase[findEmailIndex].cash
                        
                            // cashTranferDate History Func Call
                            CashTransferDate(loggedInUrlName, transferPerson, cashTransfer)
                            alert(`Successfully Cash Transferred to ${transferPerson}`)
                            }else{
                                alert("You have insufficient balance")
                            }
                        }
                    }
                    if(transferPersonIndex==undefined){
                        alert("Incorrect Email Address")
                       
                    }
                    
                }
        })
    })
    

    // ==============> FOR Cash Trasnfer End <============================

    // ==============> FOR Show & Hide Amount Start <============================

    // select the amount div
    let toggleButton = 0
    navButtons.forEach((btn ,toggleButtons)=>{
        toggleButton = toggleButtons
        btn.addEventListener("click",(e)=>{
            if(e.target.innerText.includes("Show | Hide Amount")){
              if( homeMenu.classList.contains("show")){
                    homeMenu.classList.add("hide")
                    homeMenu.classList.remove("show")     
              }else{
                homeMenu.classList.add("show")
              }
            
              
            }
        })
    });
    /// ==============> FOR Show & Hide Amount End <============================///

    // ==============> FOR Home Screen show when history screen on start <============================
   
    navButtons.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
            if(e.target.innerText.includes("Home")){
                if(homeMenu.classList.contains("hide") && transectionTable.classList.contains("show")){
                    homeMenu.classList.remove("hide")
                    homeMenu.classList.add("show")
                    transectionTable.classList.remove("show")
                    navButtons[toggleButton].disabled = false
    
                }
                
            }
        })
    });
    /// ==============>FOR Home Screen show when history screen on start   <============================///

    
    
    /// =============> Show Transection History<============================///
    let transectionTable = document.querySelector(".transectionHistory")

    // Event listeners for navigation buttons
    navButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (e.target.innerText.includes("Show Transection History")) {
                if(homeMenu.classList.contains("show") && transectionTable.classList.contains("hide")){
                    homeMenu.classList.remove("show")
                    homeMenu.classList.add("hide")
                    transectionTable.classList.add("show")
                    navButtons[toggleButton].disabled = true
                }
                let tableHTML = `<table>
                <tr>
                    <th colspan="5"><h1>Account holder Name <span>${userHistoryName}</span></h1></th>
                </tr>
                <tr>
                    <th>Trans No.</th>
                    <th>Trans Date</th>
                    <th>Account Activity</th>
                    <th>Debit</th>
                    <th>Credit</th>
                </tr>`;


                let totalAmountCashDepositHistory = 0;
                let totalAmountTransferHistory = 0;
                let totalWithDrawAmountHistory = 0;
                let RowNumbers = 1
                // fisrst of all find index of everyDatebase to match login userName
                // Database is withDraw history
                // datehistory database for deposit
                // tranferHistories database
                

                // 1 ===========dateHistory database Index found
                let dateHistoryIndex 
                for(let i=0 ; i<dateHistory.length; i++){
                    if(dateHistory[i].email == loggedInUrlName){
                         dateHistoryIndex = i 
                         console.log("dateHistory" + dateHistoryIndex)
                             // Display dateHistory
                            ContinueIndex = i
                            totalAmountCashDepositHistory += dateHistory[dateHistoryIndex].Debit;
                            tableHTML += `
                                <tr>
                                    <td>${RowNumbers++}</td>
                                    <td>${dateHistory[dateHistoryIndex].DateSet}</td>
                                    <td>Deposit</td>
                                    <td style ="color:green">${dateHistory[dateHistoryIndex].Debit}</td>
                                    <td></td>
                                </tr>`;
                    }
                }

                // 2 ======= dateHistory database Index found=====

                let tranferHistoriesIndex 
                for(let i=0 ; i<transferHistories.length ; i++){
                    if(transferHistories[i].senderName == loggedInUrlName){
                         tranferHistoriesIndex  = i
                         // Display transferHistories 
                         totalAmountTransferHistory += transferHistories[tranferHistoriesIndex].credit;
                         tableHTML += `
                             <tr>
                                 <td>${RowNumbers++}</td>
                                 <td>${transferHistories[tranferHistoriesIndex].DateSet}</td>
                                 <td> Transfer to:${transferHistories[tranferHistoriesIndex].transferPersonName}</td>
                                 <td></td>
                                 <td style ="color:red">${transferHistories[tranferHistoriesIndex].credit}</td>
                             </tr>`;
                    }
                }
                /// 3 ============== withdraw date base index found
                let withdrawHistoriesIndex 
                for(let i=0 ; i<withdrawHistories.length ; i++){
                    if(withdrawHistories[i].email == loggedInUrlName){
                    withdrawHistoriesIndex = i
                    
                        // withdraw Table
                    console.log("Draws" + withdrawHistoriesIndex)
                    totalWithDrawAmountHistory += withdrawHistories[withdrawHistoriesIndex].credit
                    tableHTML +=`
                    <tr>
                        <td>${RowNumbers++}</td>
                        <td>${withdrawHistories[withdrawHistoriesIndex].DateSet}</td>
                        <td>Withdraw Amount</td>
                        <td></td>
                        <td style="color:Red">${withdrawHistories[withdrawHistoriesIndex].credit}</td>
                    </tr>
                    `
                    }
                }
                

            
            
            // Display total amounts
            tableHTML += `
                <tr>
                    <td colspan="5"> Closing Amount (Desposit Debit History): ${totalAmountCashDepositHistory}</td>
                </tr>
                <tr>
                    <td colspan="5"> Total Amount (Transfer Credit History): ${totalAmountTransferHistory+totalWithDrawAmountHistory}</td>
                </tr>
                <tr>
                 <td colspan="5" > Current Amount: ${localDatabase[findEmailIndex].cash}</td>
                </tr>
            </table>`;

          
            
            // Set the HTML content of transectionTable
            transectionTable.innerHTML = tableHTML;
            

                  // Create Download PDF button         
                 let DownloadButton = document.createElement("button");
                  DownloadButton.classList.add("download-btn");
                  DownloadButton.innerText = "Download PDF"; 
                   transectionTable.appendChild(DownloadButton);
            

                // Create Download PDF button
                DownloadButton.addEventListener("click", function () {
                // Use html2pdf to generate and download the PDF
                    console.log(transectionTable)
                    html2pdf(transectionTable, {
                        margin: 10,
                        filename: 'transection_history.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                    });
                });

                // Append the button after the table
                
            }
        });
    });


 





    //////====================>Date function when cash desposit<======///
     // Create The local Datebase for Date History Global
     let dateHistory = JSON.parse(localStorage.getItem("dateHistory")) || [];
     let dateGet  =  new Date()
         let hrs =  dateGet.getHours()
         let mins = dateGet.getMinutes()
         let secs = dateGet.getSeconds()
         let currentDate =  dateGet.getDate()
         let currentYear = dateGet.getFullYear()
         let currentDay = ""
         let currentMonth = ""
         
 
         let days = ["Sun","Mon","Tue" ,"Wed" , "Thur", "Fri","Sat"]
         currentDay = days[dateGet.getDay()]
 
         let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
       ];
       currentMonth = months[dateGet.getMonth()]
         
     let FullDate = `${currentMonth}/${currentDate}/${currentYear} ${hrs}:${mins}:${secs}`
 
     function CashDepositDate(url_user_name, Cash_add) {
         // Retrieve existing date history from local storage
         
         // Create a new entry with email, debit amount, and the current date
         let dateEntry = {
             email: url_user_name,
             Debit: Cash_add,
             DateSet: FullDate 
         };
         // Push the new entry to the date history array
         dateHistory.push(dateEntry);
         // Save the updated date history back to local storage
         localStorage.setItem("dateHistory", JSON.stringify(dateHistory));
     }
        //////====================>Date function when cash desposit End <======///




    ////// ========>Date Function for CashTransfer To anonther user Start<=================//
    let transferHistories = JSON.parse(localStorage.getItem("transferHistories")) || [];

    function CashTransferDate(senderName, recieverName, cashTransferAmout) {
        let transferDates = {
            senderName: senderName,
            transferPersonName: recieverName,
            credit: cashTransferAmout,
            DateSet: FullDate
        };

        transferHistories.push(transferDates);

        // Store the entire transferHistory in local storage
        localStorage.setItem("transferHistories", JSON.stringify(transferHistories));
    }
        ////// ========>Date Function for CashTransfer To anonther user End <=================//


        ////// ========>Date Function for WithDraw Amounts Start <=================//

        let withdrawHistories = JSON.parse(localStorage.getItem("withdrawHistories")) || [];

        function CashWithdrawDate(activeUser, withdrawAmount) {
            let transferDates = {
                email : activeUser,
                credit: withdrawAmount,
                DateSet: FullDate
            };

            withdrawHistories.push(transferDates);

        // Store the entire transferHistory in local storage
        localStorage.setItem("withdrawHistories", JSON.stringify(withdrawHistories));
    }

    


});


//////================>PDF FILE DOWLOAD LIBARAR<====================




///// =============>>>>user login page end<<<<==================////




///// =============>>>>user logout page start<<<<==================////

document.addEventListener("DOMContentLoaded",()=>{
    let logout = document.querySelector("#logout")
    logout.addEventListener("click",()=>{
        window.location.href ="Index.html"
    })

})






// Function to generate and download the PDF



/// README 

//// findEmailindex is current login person index number 
//// 3 database desing 
/// first is users is local storage but convert into Json and name is localDatabase
/// second is DateHistort for cash desposit record maintain
/// third is transfer history for transfer amount maintain


