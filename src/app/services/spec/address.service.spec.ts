import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AddressService } from "../address.service";
import { Address } from "src/app/models/address";
import { HttpErrorResponse } from "@angular/common/http";

describe("Address Service", () => {
    const HTTPREQUEST: string = "http://localhost:8080/customers";

    let ADDRESSES: Address[] = [];

    let service: AddressService,
        httpTestingController: HttpTestingController;


    beforeEach(() => {

        ADDRESSES = [
            {
                "id": 1,
                "street": "teste rua",
                "houseNumber": 162,
                "neighborhood": "teste bairro",
                "zipCode": 13338245,
                "country": "Brasil",
                "addressType": "HomeAddress",
                "customerId": 1
            },
            {
                "id": 3,
                "street": "teste rua 3",
                "houseNumber": 100,
                "neighborhood": "teste bairro 3",
                "zipCode": 13338299,
                "country": "Brasil",
                "addressType": "BusinessAddress",
                "customerId": 1
            }
        ]

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AddressService
            ]
        });
        
        service = TestBed.inject(AddressService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it("Should retrive all addresses", () => {
        
        service.findAll(1).subscribe(addresses => {
           
            expect(addresses).toBeTruthy();
            expect(addresses.length).toBe(ADDRESSES.length);

            let address = addresses.find(address => address.id == 1);

            expect(address.street).toBe(ADDRESSES[0].street);

        })

        const req = httpTestingController.expectOne(`${HTTPREQUEST}/1/addresses`);

        expect(req.request.method).toEqual("GET");

        req.flush(ADDRESSES);

    });

    it("Should find a address by id", () => {
        service.findById(3).subscribe(address => {
            expect(address).toBeTruthy();
            expect(address.id).toBe(ADDRESSES[1].id);
        })

        const req = httpTestingController.expectOne(`${HTTPREQUEST}/addresses/id/3`);

        expect(req.request.method).toEqual("GET");

        req.flush(ADDRESSES[1])
    });

    it("Should insert a address", () => {
        service.insertAddress(ADDRESSES[0]).subscribe((address: Address) => {
            expect(address).toBeTruthy();
            expect(address.id).toBe(ADDRESSES[0].id);
            expect(address.zipCode).toBe(ADDRESSES[0].zipCode);
        })

        const req = httpTestingController.expectOne(`${HTTPREQUEST}/addresses`);

        expect(req.request.method).toEqual("POST");
        
        req.flush(ADDRESSES[0])
    });

    it("Should update a address by id", () => {
        const changes: Address = {  "id": 1,
                                    "street": "Teste mock",
                                    "houseNumber": 162,
                                    "neighborhood": "teste bairro",
                                    "zipCode": 13338123,
                                    "country": "Brasil",
                                    "addressType": "HomeAddress",
                                    "customerId": 1
                                };

        service.updateAddress(changes, ADDRESSES[0].customerId).subscribe((address: Address) =>{
            expect(address).toBeTruthy();
            expect(address.id).toBe(changes.id);
            expect(address.street).toBe(changes.street);
            expect(address.zipCode).toBe(changes.zipCode);
        })

        const req = httpTestingController.expectOne(`${HTTPREQUEST}/1/addresses/id/1`);

        expect(req.request.method).toEqual("PATCH");

        expect(req.request.body.street).toEqual(changes.street);

        req.flush({
            ...ADDRESSES[0],
            ...changes
        });

    });

    it("Should give an error if update a address fails", () => {
        const changes: Address = {  "id": 1,
                                    "street": "Teste mock",
                                    "houseNumber": 162,
                                    "neighborhood": "teste bairro",
                                    "zipCode": 13338123,
                                    "country": "Brasil",
                                    "addressType": "HomeAddress",
                                    "customerId": 1
                                };

        service.updateAddress(changes, ADDRESSES[0].customerId).subscribe(() => fail("Update should have failed"),
            (error: HttpErrorResponse) => {
                expect(error.status).toBe(500);
            }
        )

        const req = httpTestingController.expectOne(`${HTTPREQUEST}/1/addresses/id/1`);

        expect(req.request.method).toEqual("PATCH");

        req.flush('Update address failed', {status:500, statusText: 'Internal Server Error'});
    });

    it("Should delete a address by id", () => {
        service.deleteAddress(ADDRESSES[1].id).subscribe(() => {})

        const req =  httpTestingController.expectOne(`${HTTPREQUEST}/addresses/id/3`)

        expect(req.request.method).toEqual("DELETE");

    });
    
    afterEach(() => {
        httpTestingController.verify();
    });
});
