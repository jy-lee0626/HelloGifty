package com.a705.hellogifty.api.domain.entity;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
public class TradeHistory extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tradepost_id")
    private TradePost tradePost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private User buyer;

    public static TradeHistory createTradeHistory(TradePost tradePost, User loginUser, User buyer) {
        TradeHistory tradeHistory = new TradeHistory();
        tradeHistory.tradePost = tradePost;
        tradeHistory.seller = loginUser;
        tradeHistory.buyer = buyer;
        return tradeHistory;
    }
}
