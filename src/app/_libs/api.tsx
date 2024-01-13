//_libs/AudioParam.tsx
export default async function getUser(firebaseId: string) {
  const response = await fetch("http://localhost:4000/api/getUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firebaseId }),
  });
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return response.json();
}

export async function createUser(
  firebaseId: string,
  email: string,
  name: string
) {
  const response = await fetch("http://localhost:4000/api/createUser", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ firebaseId, email, name }),
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `API call failed with status ${response.status}: ${errorBody}`
    );
  }
  return response.json();
}

export async function updateUser(
  firebaseId: string,
  email: string,
  name: string
) {
  const response = await fetch("http://localhost:4000/api/updateUser", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ firebaseId, email, name }),
  });
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return response.json();
}

export async function getDaysOfWeekList() {
  const response = await fetch("http://localhost:4000/api/getDaysOfWeekList", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({}),
  });
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return response.json();
}

export async function updateDayOfWeek(dayOfWeekId: string, name: string) {
  const response = await fetch("http://localhost:4000/api/updateDayOfWeek", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ dayOfWeekId, name }),
  });
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return response.json();
}

export async function createSchedule(
  userId: string,
  daysOfWeekId: string,
  duration: number
) {
  const response = await fetch("http://localhost:4000/api/createSchedule", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ userId, daysOfWeekId, duration }),
  });
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return response.json();
}

export async function getSchedulesList(userId: string) {
  const response = await fetch("http://localhost:4000/api/getSchedulesList", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return response.json();
}

export async function updateSchedule(scheduleId: string, duration: number) {
  const response = await fetch("http://localhost:4000/api/updateSchedule", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ scheduleId, duration }),
  });
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return response.json();
}

export async function createRecord(
  userId: string,
  date: string,
  duration: number,
  note: string
) {
  const response = await fetch("http://localhost:4000/api/createRecord", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ userId, date, duration, note }),
  });
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return response.json();
}

export async function getRecordsList(
  userId: string,
  startDate: string,
  endDate: string
) {
  const response = await fetch("http://localhost:4000/api/getRecordsList", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ userId, startDate, endDate }),
  });
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return response.json();
}
