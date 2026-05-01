import axios from 'axios';

const normalizeLocalMeeting = (meeting) => ({
  _id: meeting._id,
  title: meeting.title,
  description: meeting.description || '',
  startTime: meeting.startTime,
  endTime: meeting.endTime,
  meetingLink: meeting.meetingLink || null,
  source: 'local',
  type: meeting.type,
});

const normalizeGoogleEvent = (event) => ({
  ...event,
  source: 'google',
});

const sortByStartTime = (events) =>
  events.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

export async function fetchMergedUpcomingEvents() {
  const now = new Date();
  const [googleResult, localResult] = await Promise.allSettled([
    axios.get('/api/calendar/upcoming'),
    axios.get('/api/meetings'),
  ]);

  const events = [];

  if (googleResult.status === 'fulfilled') {
    events.push(...googleResult.value.data.map(normalizeGoogleEvent));
  }

  if (localResult.status === 'fulfilled') {
    events.push(
      ...localResult.value.data
        .filter((meeting) => new Date(meeting.startTime) >= now)
        .map(normalizeLocalMeeting)
    );
  }

  if (events.length === 0 && googleResult.status === 'rejected' && localResult.status === 'rejected') {
    throw new Error(
      localResult.reason?.response?.data?.message ||
        googleResult.reason?.response?.data?.message ||
        'Failed to fetch meetings'
    );
  }

  return sortByStartTime(events);
}

export async function fetchMergedMonthEvents({ timeMin, timeMax }) {
  const start = new Date(timeMin);
  const end = new Date(timeMax);
  const [googleResult, localResult] = await Promise.allSettled([
    axios.get('/api/calendar/month', {
      params: { timeMin, timeMax },
    }),
    axios.get('/api/meetings'),
  ]);

  const events = [];

  if (googleResult.status === 'fulfilled') {
    events.push(...googleResult.value.data.map(normalizeGoogleEvent));
  }

  if (localResult.status === 'fulfilled') {
    events.push(
      ...localResult.value.data
        .filter((meeting) => {
          const meetingStart = new Date(meeting.startTime);
          return meetingStart >= start && meetingStart <= end;
        })
        .map(normalizeLocalMeeting)
    );
  }

  if (events.length === 0 && googleResult.status === 'rejected' && localResult.status === 'rejected') {
    throw new Error(
      localResult.reason?.response?.data?.message ||
        googleResult.reason?.response?.data?.message ||
        'Failed to fetch calendar events'
    );
  }

  return sortByStartTime(events);
}
