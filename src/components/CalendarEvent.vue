<template>
  <!-- Anfang: Template für die Calendar-Event-Component -->
  <div id="calendar-event">
    <div class="alert text-center" :class="alertColor">
      <transition name="fade" mode="out-in">
        <div v-if="!event.edit">
          <div>
            <slot name="eventPriority" :computedPriority="computedPriority"></slot>
          </div>
          <slot :event="event">
            <div>{{ event.title }}</div>
          </slot>
          <div>
            <i class="fas fa-edit me-2" role="button" @click="editEvent()"></i>
            <i class="far fa-trash-alt" role="button" @click="deleteEvent()"></i>
          </div>
        </div>
        <div v-else>
          <input type="text" class="form-control" ref="newEventTitleInput" :placeholder="event.title" v-model="newEventTitle" @keyup.enter="updateEvent()"/>
          <select class="form-select mt-2" v-model="newEventPriority">
            <option value="1">Hoch</option>
            <option value="0">Mittel</option>
            <option value="-1">Tief</option>
          </select>
          <hr>
          <i class="fas fa-check" role="button" @click="updateEvent()"></i>
        </div>
      </transition>
    </div>
  </div>
  <!-- Ende: Template für die Calendar-Event-Component -->
</template>

<script>
import Store from "@/store";
export default {
  name: "CalendarEvent",
  props: {
    event: Object,
    day: Object,
  },
  data() {
    return {
      newEventTitle: "",
      newEventPriority: this.event.priority,
    };
  },
  computed: {
    alertColor() {
      return "alert-" + this.event.color;
    },
    computedPriority() {
      if (this.event.priority === 1)
        return "Hoch";
      else{
        if (this.event.priority === 0)
          return "Mittel";
        else
          return "Tief";
      }
    }
  },
  methods: {
    deleteEvent() {
      Store.mutations.deleteEvent(this.day.id, this.event.title);
    },
    editEvent() {
      Store.mutations.editEvent(this.day.id, this.event.title);
      this.$nextTick(() => {
        this.$refs.newEventTitleInput.focus();
      });
    },
    updateEvent() {
      Store.mutations.updateEvent(this.day.id, this.event.title, {
        title: this.newEventTitle,
        priority: this.newEventPriority,
      });
    },
  }
}
</script>

<style scoped>

</style>