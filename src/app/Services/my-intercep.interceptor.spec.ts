import { TestBed } from '@angular/core/testing';

import { MyIntercepInterceptor } from './my-intercep.interceptor';

describe('MyIntercepInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MyIntercepInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MyIntercepInterceptor = TestBed.inject(MyIntercepInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
