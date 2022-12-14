package com.a705.chat.api.domain.enums;

public enum MessageType {
    ENTER(0, "채팅방 입장"),
    EXIT(1, "채팅방 퇴장"),
    TALK(2, "메시지 전송"),
    PAY(3,"입금 완료"),
    TRADE(4,"거래 완료");
//    PROFILE_REQUEST(3, "상대방 프로필 요청");

    private final int code;
    private final String name;

    MessageType(int code, String name) {
        this.code = code;
        this.name = name;
    }

    public int getCode() {
        return code;
    }

    public String getName() {
        return name;
    }
}
