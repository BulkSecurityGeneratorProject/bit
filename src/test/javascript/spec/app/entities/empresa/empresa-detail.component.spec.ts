/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BcbTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EmpresaDetailComponent } from '../../../../../../main/webapp/app/entities/empresa/empresa-detail.component';
import { EmpresaService } from '../../../../../../main/webapp/app/entities/empresa/empresa.service';
import { Empresa } from '../../../../../../main/webapp/app/entities/empresa/empresa.model';

describe('Component Tests', () => {

    describe('Empresa Management Detail Component', () => {
        let comp: EmpresaDetailComponent;
        let fixture: ComponentFixture<EmpresaDetailComponent>;
        let service: EmpresaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BcbTestModule],
                declarations: [EmpresaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EmpresaService,
                    JhiEventManager
                ]
            }).overrideTemplate(EmpresaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmpresaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpresaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Empresa(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.empresa).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
