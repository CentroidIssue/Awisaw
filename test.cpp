#include <bits/stdc++.h>
using namespace std;
int n, q;
const int maxN = 2e5 + 10;
const int inf = 0x3f3f3f3f;
int st[maxN * 4];
int a[maxN];

void build(int id = 1, int l = 1, int r = n){
    if (l == r){
        st[id] = a[l];
        return;
    }
    int mid = (l + r) >> 1;
    build(id << 1, l, mid);
    build(id << 1 | 1, mid + 1, r);
    st[id] = min(st[id << 1], st[id << 1 | 1]);
}

void update(int id, int i, int x, int l = 1, int r = n){
    if (l == r){
        st[id] = x;
        return;
    }
    int mid = (l + r) >> 1;
    if (i <= mid) update(id << 1, i, x, l, mid);
    else update(id << 1 | 1, i, x, mid + 1, r);
    st[id] = min(st[id << 1], st[id << 1 | 1]);
}

int get(int id, int i, int j, int l = 1, int r = n){
    if (i > r || l > j) return inf;
    if (i <= l && r <= j) return st[id];
    int mid = (l + r) >> 1;
    return min(get(id << 1, i, j, l, mid), get(id << 1 | 1, i, j, mid + 1, r));
}

void Init(){
    cin >> n >> q;
    for (int i = 1; i <= n; ++i){
        cin >> a[i];
    }
    build();
    while (q--){
        int t, l, r;
        cin >> t >> l >> r;
        if (t == 1){
            update(1, l, r);
        }
        else{
            cout << get(1, l, r) << "\n";
        }
    }

}

signed main(){
    Init();
}