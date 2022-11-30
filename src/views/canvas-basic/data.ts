const base = {
    x: 1,
    y: 1,
};

setTimeout(() => {
    base.x = 100;
}, 4000);

export default {
    base,
};
