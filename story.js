class story {
    constructor(video_link, title_, disciption_, id_, address_) {
        this.video_url = video_link;
        this.title = title_;
        this.disciption = disciption_;
        this.id = id_;
        this.location = address_;
    }
    get id() {
        return this.id;
    }
    show() {

    }
}