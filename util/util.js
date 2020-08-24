let Success = (data, message) => {
    return {
        data: data,
        message: message,
        error: false,
        status:200
    };
}

let Failure = (message) => {
    return {
        message: message,
        error: true,
        status:400
    };
}

module.exports = {
    Success,
    Failure,
};
