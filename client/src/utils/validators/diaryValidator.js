export const validPositiveTest = (positiveTest) => {
    const todaysDate = new Date();
    const pickedDate = new Date(Date.parse(positiveTest.replace(/-/g, " ")));

    if (todaysDate >= pickedDate &&
        positiveTest !== ''
    ) {
        return '';
    }

    return (`Invalid date`);
};

export const validDueDate = (dueDate) => {
    const todaysDate = new Date();
    const pickedDate = new Date(Date.parse(dueDate.replace(/-/g, " ")));

    if (todaysDate < pickedDate &&
        dueDate !== ''
    ) {
        return '';
    }

    return (`Invalid date`);
};