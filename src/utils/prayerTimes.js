export const convertTimeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
};

export const getPrayerTimes = (prayerTimes) => {
    return {
        fajr: convertTimeToMinutes(prayerTimes.fajr),
        sunrise: convertTimeToMinutes(prayerTimes.sunrise),
        dohr: convertTimeToMinutes(prayerTimes.dohr),
        maghrib: convertTimeToMinutes(prayerTimes.maghrib),
        isha: convertTimeToMinutes(prayerTimes.isha)
    };
}; 