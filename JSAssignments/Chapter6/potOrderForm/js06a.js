"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Chapter case

      Order Form Code
      Author: 
      Date:   

      Filename: js06a.js
 */

window.addEventListener("load", function() {
      let orderForm = document.forms.orderForm;
      let model = orderForm.elements.model;

      //Select Model selection list when form opens
      model.focus();

      //Calculate the cost of the order
      //Add an event listener for every form element
      for(let i = 0; i < orderForm.elements.length; i++)
      {
            orderForm.elements[i].addEventListener("change", calcOrder);
      }

      function calcOrder()
      {
            //Determine the selected model
            let mIndex = model.selectedIndex;
            let mValue = model.options[mIndex].value;

            //Determine the selected quantity
            let qIndex = orderForm.elements.qty.selectedIndex;
            let quantity = orderForm.elements.qty[qIndex].value;

            //Model cost = model cost x quantity
            let modelCost = mValue * quantity;
            orderForm.elements.modelCost.value = 
                        modelCost.toLocaleString("en-US", {style: "currency", currency: 'USD'});

            //Retrieve the cost of the protection plan
            let planValue = document.querySelector('input[name="plan"]:checked').value;

            //Charge the plan to each item ordered
            let planCost = planValue * quantity;
            orderForm.elements.planCost.value = 
                        planCost.toLocaleString("en-US", {style: "currency", currency: 'USD'});

            //Calculate the order subtotal
            let subtotal = modelCost + planCost;
            orderForm.elements.subtotal.value = 
                        subtotal.toLocaleString("en-US", {style: "currency", currency: 'USD'});

            //Calculate the 5% sales tax
            let salesTax = subtotal * 0.05;
            orderForm.elements.salesTax.value = 
                        salesTax.toLocaleString("en-US", {style: "currency", currency: 'USD'});

            //Calculate the total cost of the order
            let totalCost = subtotal + salesTax;
            orderForm.elements.totalCost.value = 
                        totalCost.toLocaleString("en-US", {style: "currency", currency: 'USD'});

            //retrieve the text in the selected model (mIndex) and store it in the 
            //hidden field called modelName
            orderForm.elements.modelName.value = model.options[mIndex].text;

            //retrieve the plan label for the selected plan
            //retrieve the text content of the selected plan label
            //and store it in the hidden field called planName
            let selectedPlan = document.querySelector('input[name="plan"]:checked');
            orderForm.elements.planName.value = selectedPlan.labels[0].textContent;
      }
});