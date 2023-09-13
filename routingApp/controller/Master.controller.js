sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/Router",
	"sap/ui/Device"
], function (Controller, JSONModel, Device) {
	"use strict";

	return Controller.extend("testebtb.Master", {
		onInit: function () {
			this.getOwnerComponent().getRouter().getRoute("master").attachPatternMatched(this._onRouteMatched, this);

			jQuery.ajax({
				url: "/routingApp/controller/data.json",
				dataType: "json",
				success: function (oData) {
					var oListModel = new JSONModel(oData);
					var oGlobalModel = this.getOwnerComponent().getModel("globalModel");
    				oGlobalModel.setProperty("/employeeList", oListModel);
					this.getView().setModel(oListModel, "listModel");
				}.bind(this),
				error: function () {
					console.error("Erro ao carregar o arquivo JSON");
				}
			});
		},
		calculateAge: function (sBorn) {
			var oBornDate = new Date(sBorn);
			var oNowDate = new Date();
			var nAge = oNowDate.getFullYear() - oBornDate.getFullYear();
			if (oNowDate.getMonth() < oBornDate.getMonth() || (oNowDate.getMonth() === oBornDate.getMonth() && oNowDate.getDate() < oBornDate.getDate())) {
				nAge--;
			}
			return nAge;
		},
		onFilterInputChange: function (oEvent) {
			var sFilterValue = oEvent.getParameter("value");
			var oList = this.getView().byId("workerList");
			var oBinding = oList.getBinding("items");

			var aFilters = [];
			if (sFilterValue) {
				var oNameFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sFilterValue);
				var oLastNameFilter = new sap.ui.model.Filter("lastName", sap.ui.model.FilterOperator.Contains, sFilterValue);
				aFilters.push(new sap.ui.model.Filter({ filters: [oNameFilter, oLastNameFilter], and: false }));
			}

			oBinding.filter(aFilters);
		},

		onEmployeeListItemPress: function (oEvent) {
			var oContext = oEvent.getSource().getBindingContext("listModel");
			var sEmployeeId = oContext.getProperty("id");
			this.getOwnerComponent().getRouter()
				.navTo("employeeDetails",
					{employeeId: sEmployeeId});
		}

	});
});
