import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";

const state = reactive({
    calendarWeekData,
    activeView: "CalendarWeek",
});

const getters = {
    activeDay: () => state.calendarWeekData.find((day) => day.active),
    activeView: () => state.activeView,
};

const mutations = {
    setActiveView(view) {
        state.activeView = view;
        console.log(state.activeView);
    },
    deleteEvent(dayId, eventTitle) {
        const dayObject = state.calendarWeekData.find((day) => day.id === dayId);
        const eventIndex = dayObject. events.findIndex((event) => event.title === eventTitle);
        dayObject.events.splice(eventIndex, 1);
    },
    editEvent(dayId, eventTitle) {
        state.calendarWeekData.map((day) => {
            day.events.map((event) => event.edit = false);
        });
        const dayObject = state.calendarWeekData.find((day) => day.id === dayId);
        const eventObj = dayObject.events.find((event) => event.title === eventTitle);
        eventObj.edit = true;
    },
    updateEvent(dayId, oldEventTitle, newEvent) {
        newEvent.title = newEvent.title !== "" ? newEvent.title : oldEventTitle;
        const dayObject = state.calendarWeekData.find((day) => day.id === dayId);
        const eventObj = dayObject.events.find((event) => event.title === oldEventTitle);
        eventObj.title = newEvent.title;
        eventObj.priority = Number(newEvent.priority);
        eventObj.edit = false;
    },
    createEvent(event) {
        if (event.title === "")
            return;
        getters.activeDay().events.push({
            title: event.title,
            edit: false,
            color: event.color,
            priority: Number(event.priority),
        });
    },
    changeActiveDay(dayId) {
        state.calendarWeekData.map((day) => {
           day.active = false;
        });
        const day = state.calendarWeekData.find((day) => day.id === dayId);
        day.active = true;
    }
};

export default {
    state: readonly(state),
    getters,
    mutations,
};