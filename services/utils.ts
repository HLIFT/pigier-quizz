export const convertSecondsToMinutes = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60

    return {
        minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds
    }
}
