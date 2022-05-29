import { Component, Vue, Inject } from 'vue-property-decorator';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import { IEmployee, Employee } from '@/shared/model/employee.model';
import EmployeeService from './employee.service';

const validations: any = {
  employee: {
    firstName: {},
    lastName: {},
    email: {},
    phoneNumber: {},
    hireDate: {},
    salary: {},
    commissionPct: {},
  },
};

@Component({
  validations,
})
export default class EmployeeUpdate extends Vue {
  @Inject('employeeService') private employeeService: () => EmployeeService;
  @Inject('alertService') private alertService: () => AlertService;

  public employee: IEmployee = new Employee();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.employeeId) {
        vm.retrieveEmployee(to.params.employeeId);
      }
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.employee.id) {
      this.employeeService()
        .update(this.employee)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Employee is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.employeeService()
        .create(this.employee)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Employee is created with identifier ' + param.id;
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.employee[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.employee[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.employee[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.employee[field] = null;
    }
  }

  public retrieveEmployee(employeeId): void {
    this.employeeService()
      .find(employeeId)
      .then(res => {
        res.hireDate = new Date(res.hireDate);
        this.employee = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
