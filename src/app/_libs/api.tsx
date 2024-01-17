//_libs/api.tsx
export default async function getUser(firebaseId: string) {
  try {
    const response = await fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firebaseId }),
    });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Response Error:", response.status, errorBody); // デバッグ情報
      throw new Error(
        `API call failed with status ${response.status}: ${errorBody}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("getUser Error:", error); // デバッグ情報
    throw error;
  }
}

export async function createUser(
  firebaseId: string,
  email: string,
  name: string
) {
  const response = await fetch("/api/createUser", {
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

export async function updateUser(userId: string, email: string, name: string) {
  const response = await fetch("/api/updateUser", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ userId, email, name }),
  });
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return response.json();
}

export async function getDaysOfWeekList() {
  const response = await fetch("/api/getDaysOfWeekList", {
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
  const response = await fetch("/api/updateDayOfWeek", {
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
  dayOfWeekId: string,
  duration: number
) {
  const response = await fetch("/api/createSchedule", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ userId, dayOfWeekId, duration }),
  });
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return response.json();
}

export async function getSchedulesList(userId: string) {
  const response = await fetch("/api/getSchedulesList", {
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
  const response = await fetch("/api/updateSchedule", {
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
  const response = await fetch("/api/createRecord", {
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
  const response = await fetch("/api/getRecordsList", {
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
