<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="employee">
        <h2 class="jh-entity-heading" data-cy="employeeDetailsHeading"><span>Employee</span> {{ employee.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>First Name</span>
          </dt>
          <dd>
            <span>{{ employee.firstName }}</span>
          </dd>
          <dt>
            <span>Last Name</span>
          </dt>
          <dd>
            <span>{{ employee.lastName }}</span>
          </dd>
          <dt>
            <span>Email</span>
          </dt>
          <dd>
            <span>{{ employee.email }}</span>
          </dd>
          <dt>
            <span>Phone Number</span>
          </dt>
          <dd>
            <span>{{ employee.phoneNumber }}</span>
          </dd>
          <dt>
            <span>Hire Date</span>
          </dt>
          <dd>
            <span>{{ employee.hireDate | formatDate }}</span>
          </dd>
          <dt>
            <span>Salary</span>
          </dt>
          <dd>
            <span>{{ employee.salary }}</span>
          </dd>
          <dt>
            <span>Commission Pct</span>
          </dt>
          <dd>
            <span>{{ employee.commissionPct }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
        </button>
        <router-link v-if="employee.id" :to="{ name: 'EmployeeEdit', params: { employeeId: employee.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./employee-details.component.ts"></script>
