package com.seifeddine.PaymentService.api;


import com.seifeddine.PaymentService.dto.StripeChargeDto;
import com.seifeddine.PaymentService.dto.StripeTokenDto;
import com.seifeddine.PaymentService.services.StripeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public/stripe")
public class StripeApi {

    private final StripeService stripeService;

    public StripeApi(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/card/token")
    @ResponseBody
    public StripeTokenDto createCardToken(@RequestBody StripeTokenDto model) {
        return stripeService.createCardToken(model);
    }

    @PostMapping("/charge")
    @ResponseBody
    public StripeChargeDto charge(@RequestBody StripeChargeDto model) {
        return stripeService.charge(model);
    }
}

