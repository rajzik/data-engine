

Number.prototype.isGreater = toCompare => this >= toCompare;

Number.prototype.isLess = toCompare => this <= toCompare;


String.prototype.isGreater = toCompare => this >= toCompare;

String.prototype.isLess = toCompare => this <= toCompare;


Date.prototype.compare = toCompare => this.getTime() === toCompare.getTime();


Date.prototype.isGreater = toCompare => this.getTime() >= toCompare.getTime();

Date.prototype.isLess = toCompare => this.getTime() <= toCompare.getTime();

