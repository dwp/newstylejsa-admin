# How to / Add dynamic (past or future) dates to input hint text

## Back to the future :)

In some cases we need to display a past or a future day relative to the user's current date. For instance if the heading on a page 'in the past 12 months' - we might want to use a date 12 months before the current date as a demonstration in the input control's hint field.

### Add dynamic date to a hint in your template

To add a dynamic date to a hint field, you'll need to use the hint's HTML option - here is an example:

```
hint: {
	html: 'For example, <span class="moment" data-moment="subtract 12 months"></span>'
},
```

For the `data-moment` attribute we follow the moment JS API, so the 3 values separated in the string are:

- method (substract)
- amount (12)
- unit (months)

### A few more examples
- ```<span class="moment" data-moment="subtract 12 months"></span>```
- ```<span class="moment" data-moment="add 3 days"></span>```
- ```<span class="moment" data-moment="add 2 years"></span>```
- ```<span class="moment" data-moment="subtract 4 months"></span>```

> If an element uses the `.moment` class name, but the data-moment attribute is empty, not set or invalid, the current date will be rendered.

### Supported moment methods
- [https://momentjs.com/docs/#/manipulating/add/](https://momentjs.com/docs/#/manipulating/add/)
- [https://momentjs.com/docs/#/manipulating/subtract/](https://momentjs.com/docs/#/manipulating/subtract/)