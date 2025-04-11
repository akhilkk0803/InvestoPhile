def rebalance(weights, rankings, top_n=3):
    # Equal weight the top_n ranked assets
    new_weights = {asset: 0 for asset in weights.keys()}
    selected_assets = rankings[:top_n]
    weight_per_asset = 1 / top_n
    for asset in selected_assets:
        new_weights[asset] = weight_per_asset
    return new_weights