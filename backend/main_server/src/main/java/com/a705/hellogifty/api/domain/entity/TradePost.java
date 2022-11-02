package com.a705.hellogifty.api.domain.entity;

import com.a705.hellogifty.api.domain.enums.TradeState;
import com.a705.hellogifty.api.dto.trade_post.TradePostEditRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TradePost extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "gifticon_id")
    private Gifticon gifticon;

    @Column(length = 50)
    private String title;

    @Column(length = 100)
    private String content;

    private Integer price;

    @Enumerated(EnumType.STRING)
    private TradeState tradeState;

    @Column(length = 300)
//    private String img;

    private LocalDate createdAt;

    private LocalDate modifiedAt;

    public void update(TradePostEditRequestDto tradePostEditRequestDto) {
        this.title = tradePostEditRequestDto.getTitle();
        this.content = tradePostEditRequestDto.getContent();
        this.price = tradePostEditRequestDto.getPrice();
        this.tradeState = tradePostEditRequestDto.getTradeState();
        this.modifiedAt = LocalDate.now();
    }
}
