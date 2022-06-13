<template>
  <!-- Anfang: Template für die Calendar-Day-Component -->
  <div class="card border start" :class="cardClasses" @click="changeActiveDay()">
    <div class="card-header text-center" :class="cardHeaderClasses" role="button">
      <strong>{{ day.fullName }}</strong>
    </div>
    <div class="card-body">
      <div id="calendar-day">
        <transition name="fade" mode="out-in">
          <div v-if="day.events.length">
            <CalendarEvent v-for="event in day.events" :key="event.id" :event="event" :day="day">
              <template #eventPriority="slotProps">
                <h4>{{ slotProps.computedPriority }}</h4>
              </template>
              <template #default="{ event }">
                {{ event.title }}
              </template>
            </CalendarEvent>
          </div>
          <div v-else>
            <div class="alert alert-light text-center">
              <i>Keine Termine</i>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
  <!-- Ende: Template für die Calendar-Day-Component -->
</template>

<script>
import CalendarEvent from "@/components/CalendarEvent";
import Store from "@/store";
export default {
  name: "CalendarDay",
  props: {
    day: {
      type: Object,
      required: true,
      default ()
      {
        return {
          id: -1,
          fullName: "Fehlender Wochentag",
          events: [],
        }
      },
      validator (value) {
        if (Object.keys(value).includes("id")) {
          return true;
        }
      },
    },
  },
  components: {
    CalendarEvent,
  },
  computed: {
    cardClasses() {
      return this.day.id === Store.getters.activeDay().id ? ["border-primary"] : null;
    },
    cardHeaderClasses() {
      return this.day.id === Store.getters.activeDay().id ? ["bg-primary", "text-white"] : null;
    },
  },
  methods: {
    changeActiveDay() {
      Store.mutations.changeActiveDay(this.day.id);
    },
  },
}
</script>

<style>
</style>