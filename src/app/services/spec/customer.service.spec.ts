import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpErrorResponse } from "@angular/common/http";
import { Customer } from "src/app/models/customer";
import { CustomerService } from "../customer.service";

interface CustomerMock {
    id: number;
    customerName: string;
    documentNumber: number;
    customerStatus: string;
    customerType: string;
    creditScore: string;
}

describe("Customer Service", () => {
    const HTTPREQUEST: string = "http://localhost:8080/customers";

    let CUSTOMER_MOCK: CustomerMock;
    let CUSTOMER: Customer;

    let service: CustomerService,
        httpTestingController: HttpTestingController;


    beforeEach(() => {

        CUSTOMER_MOCK = {
            id: 1,
            customerName: "Vinicius Camargo Reis",
            documentNumber: 44984842823,
            customerStatus: "Active",
            customerType: "LegalPerson",
            creditScore: "30",
            },

        CUSTOMER = {
            customerName: "Vinicius Camargo Reis",
            documentNumber: 44984842823,
            customerStatus: "Active",
            customerType: "LegalPerson",
            creditScore: "30",
            userId: 1
            },

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CustomerService
            ]
        });
        
        service = TestBed.inject(CustomerService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });
   
    it("Should find a customer by id", () => {
        service.findById(CUSTOMER_MOCK.id).subscribe((result: any) => {
            expect(result).toBeTruthy();
            expect(result.id).toBe(CUSTOMER_MOCK.id);
            expect(result.customerName).toBe(CUSTOMER_MOCK.customerName);
        })

        const req = httpTestingController.expectOne(`${HTTPREQUEST}/1`);

        expect(req.request.method).toEqual("GET");

        req.flush(CUSTOMER_MOCK)
    });

    it("Should insert a customer", () => {
        service.insertCustomer(CUSTOMER).subscribe((customer: Customer) => {
            expect(customer).toBeTruthy();
            expect(customer.documentNumber).toBe(CUSTOMER.documentNumber);
            expect(customer.customerName).toBe(CUSTOMER.customerName);
        })

        const req = httpTestingController.expectOne(`${HTTPREQUEST}`);

        expect(req.request.method).toEqual("POST");
        
        req.flush(CUSTOMER)
    });

    it("Should update a customer by id", () => {
        
        const changes: Customer = {
            customerName: "Teste mock update",
            documentNumber: 11111111111,
            customerStatus: "Active",
            customerType: "LegalPerson",
            creditScore: "30",
            userId: 1
        }

        service.updateCustomer(changes, CUSTOMER_MOCK.id).subscribe((customer: Customer) =>{
            expect(customer).toBeTruthy();
            expect(customer.documentNumber).toBe(changes.documentNumber);
            expect(customer.customerName).toBe(changes.customerName);
        })

        const req = httpTestingController.expectOne(`${HTTPREQUEST}/1`);

        expect(req.request.method).toEqual("PATCH");

        expect(req.request.body.documentNumber).toEqual(changes.documentNumber);

        req.flush({
            ...CUSTOMER,
            ...changes
        });

    });
    
    afterEach(() => {
        httpTestingController.verify();
    });
});
