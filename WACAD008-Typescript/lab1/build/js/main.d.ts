type Reminder = [
    title: string,
    dateHours: Date,
    deadline: Date | undefined,
    description: string | undefined
];
declare let reminders: Reminder[];
declare function addReminder(title: string, deadline?: Date, description?: string): void;
declare function removeReminder(id: number): void;
declare function editReminder(id: number, title?: string, deadline?: Date, description?: string): void;
declare function listReminders(): void;
declare const addBtn: HTMLElement | null;
//# sourceMappingURL=main.d.ts.map