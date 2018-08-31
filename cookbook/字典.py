from collections import defaultdict

d = defaultdict(list)
d['a'].append(1)
d['a'].append(2)
d['b'].append(3)
print(d)

d = defaultdict(set)
d['a'].add(1)
d['a'].add(2)
d['d'].add(4)
print(d)

d = {} # 一个普通的字典
d.setdefault('a', []).append(1)
d.setdefault('a', []).append(2)
d.setdefault('b', []).append(4)
print(d)
print(type(d))