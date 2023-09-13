sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageToast'], function (Controller, JSONModel, MessageToast) {
		"use strict";

		return Controller.extend("sap.ui.core.sample.RoutingMasterDetail.routingApp.controller.Detail", {
			onInit: function () {
				this.getOwnerComponent().getRouter().getRoute("employeeDetails").attachPatternMatched(this._onRouteMatched, this);
			},
			_onRouteMatched: function (oEvent) {
				this._employeeId = oEvent.getParameter("arguments").employeeId;
				var oGlobalModel = this.getOwnerComponent().getModel("globalModel");
				var employeeList = oGlobalModel.getProperty("/employeeList");
				if (employeeList) {
					var employees = employeeList.getData()
					var employee = employees.find(a => a.id == this._employeeId)

					if (employee) {
						this.employee = { ...employee }
						var e = new JSONModel(employee);
						var oView = this.getView();
						var oForm = oView.byId("SimpleFormChange");
						this.getView().byId("name").setEnabled(false);
						this.getView().byId("lastName").setEnabled(false);
						this.getView().byId("address").setEnabled(false);
						this.getView().byId("born").setEnabled(false);
						this.getView().byId("cpf").setEnabled(false);
						var oEditButton = oView.byId("editButton");
						var oSaveButton = oView.byId("saveButton");
						oEditButton.setVisible(true);
						oSaveButton.setVisible(false);
						oForm.setVisible(true);
						this.getView().setModel(e, "employee");
					} else {
						this.getOwnerComponent().getRouter().navTo("employeeDetails", { employeeId: 0 }, true);
					}
				} else {
					this.getOwnerComponent().getRouter().navTo("employeeDetails", { employeeId: 0 }, true);
				}

			},
			onEditPress: function () {
				var oView = this.getView();
				var oForm = oView.byId("SimpleFormChange");
				var bEditable = !oForm.getEditable();

				oForm.setEditable(bEditable);

				this.getView().byId("name").setEnabled(true);
				this.getView().byId("lastName").setEnabled(true);
				this.getView().byId("address").setEnabled(true);
				this.getView().byId("born").setEnabled(true);
				this.getView().byId("cpf").setEnabled(true);

				var oEditButton = oView.byId("editButton");
				var oSaveButton = oView.byId("saveButton");
				oEditButton.setVisible(false);
				oSaveButton.setVisible(true);
			},
			onSavePress: function () {
				var inputName = this.getView().byId("name");
				var inputCpf = this.getView().byId("cpf");
				var inputLastName = this.getView().byId("lastName");
				var inputBorn = this.getView().byId("born");
				var inputAddress = this.getView().byId("address");

				var formData = {
					name: inputName.getValue(),
					lastName: inputLastName.getValue(),
					cpf: inputCpf.getValue(),
					born: inputBorn.getValue(),
					address: inputAddress.getValue(),
				};
				var oGlobalModel = this.getOwnerComponent().getModel("globalModel");
				var employeeList = oGlobalModel.getProperty("/employeeList");
				var employees = employeeList.getData()

				var changes = []
				if (this.employee.name != formData.name) changes.push("nome")
				if (this.employee.lastName != formData.lastName) changes.push("sobrenome")
				if (this.employee.cpf != formData.cpf) changes.push("cpf")
				if (this.employee.born != formData.born) changes.push("data de nascimento")
				if (this.employee.address != formData.address) changes.push("endereço")
				MessageToast.show(`${changes.toString()} atualizado com sucesso!`);
			}

		});

	});
