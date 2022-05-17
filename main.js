//buttons
const addProductButton = document.querySelector('#addProductButton');
const productParent  = document.querySelector('#productFieldParent');
const calculateButton = document.querySelector('#calculateButton');
const emptyAllButton = document.querySelector('#emptyAllButton');

const productAmountText = document.querySelector('#productAmountText');
const orderTotalText = document.querySelector('#orderTotalText');
const orderTotalText2 = document.querySelector('#orderTotalText2');


let productAmount = 1;
let orderArray = [];
let orderTotalCostDiscounted = 0;
let orderTotalCost = 0;


// Add a new product field on a button click
if(addProductButton != null){
    addProductButton.addEventListener('click', function(){
        productAmount++;
        productAmountText.innerHTML = 'Tuotteita yhteensä: ' + productAmount;
        // create new product field
        addInputfield(1);
    });
}

// Calculate discounted price on a button click
if(calculateButton != null){
    calculateButton.addEventListener('click', function(){
        for(let i = 1; i < productAmount + 1; i++){
            const discountedText = document.querySelector('#discountedText' + i);
            let productInputValue = document.querySelector('#productInputField' + i).value;
            let discountInputValue = document.querySelector('#discountInputField' + i).value;

            orderTotalCost += parseFloat(productInputValue);

            // if discount is 0, keep the value and do not calculate
            if(discountInputValue == 0){
                discountedText.innerHTML = ' Hinta: ' + productInputValue + '€';
                orderArray.push(parseFloat(productInputValue));
            }
            else{
                // If input fields is not null and greater than 0 -> calculate values
                if(productInputValue != null && productInputValue > 0 && discountInputValue != null && discountInputValue > 0){
                    let value = calculatePercentage(discountInputValue, productInputValue);
                    let discountedValue = productInputValue - value;
                    
                    discountedText.innerHTML = ' Alennettu hinta: ' + discountedValue.toFixed(3) + "€";
                    orderArray.push(discountedValue);
                }
                else{
                    console.log('Error: values is not set correctly');
                }
            }
        }
        // to calculate total discounted price, get every value from array and store it to variable
        for(let i = 0; i < orderArray.length; i++){
            orderTotalCostDiscounted += parseFloat(orderArray[i]);
        }

        //get discount amount by decreasing discounted price from total price
        let discountAmount = orderTotalCost - orderTotalCostDiscounted;

        // set text fields to results and zero arrays and variables
        orderTotalText.innerHTML = 'Tuotteiden yhteishinta: ' + orderTotalCostDiscounted.toFixed(3) + '€'
            + ' Alennuksen määrä: ' + discountAmount.toFixed(3) + '€';
        orderTotalText2.innerHTML = orderTotalText.innerHTML;
        orderArray = [];
        orderTotalCostDiscounted = 0;
        orderTotalCost = 0;
    });
}

function calculatePercentage(percent, price){
    return (percent / 100) * price;
}

function addInputfield(times){
    for(i = 0; i < times; i++){
        let listElement = document.createElement('li');
        listElement.className = 'productField';

        let productText = document.createElement('label');
        productText.htmlFor = 'productInputfield';
        productText.className = 'productText';
        productText.innerHTML = 'Tuotteen hinta (€): ';

        let productInputField = document.createElement('input');
        productInputField.type = 'number';
        productInputField.className = 'productInputField';
        productInputField.id = 'productInputField' + productAmount;
        productInputField.value = 0;

        let discountText = document.createElement('label');
        discountText.htmlFor = 'discountInputField';
        discountText.className = 'discountText';
        discountText.innerHTML = ' Alennusta (%): ';

        let discountInputField = document.createElement('input');
        discountInputField.type = 'number';
        discountInputField.className = 'discountInputField';
        discountInputField.id = 'discountInputField' + productAmount;
        discountInputField.value = 0;

        let discountedText = document.createElement('label');
        discountedText.className = 'discountedText';
        discountedText.id = 'discountedText' + productAmount;
        discountedText.innerHTML = ' Alennettu hinta: 0.000€ ';

        listElement.appendChild(productText);
        listElement.appendChild(productInputField);
        listElement.appendChild(discountText);
        listElement.appendChild(discountInputField);
        listElement.appendChild(discountedText);

        productParent.appendChild(listElement);
    }
}

// if empty all button is clicked reload the page so it resets all values
if(emptyAllButton != null){
    emptyAllButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}